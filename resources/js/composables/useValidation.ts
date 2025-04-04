import { ref, reactive, toRaw } from "vue";

type ValidationRule =
    | 'required'
    | { min?: number }
    | { max?: number }
    | { type: 'number' | 'email' }
    | { custom: (value: any, form: any) => true | string };

type ValidationRules<T> = {
    [K in keyof T]?: ValidationRule[];
}

type Errors<T> = Partial<Record<keyof T, string>>;

export default function useValidation<T extends Record<string, any>>() {
    const errors = reactive<Errors<T>>({});
    const hasErrors = ref(false);

    const validate = (form: T, rules: ValidationRules<T>): boolean => {
        // cleanErrors();

        for (const field in rules) {
            const value = form[field];
            const fieldRules = rules[field];
            if (fieldRules) validateField(field as keyof T, value, fieldRules, form);
        }

        hasErrors.value = Object.keys(errors).length > 0;
        return hasErrors.value;
    }

    const validateField = (field: keyof T, value: any, fieldRules: ValidationRule[], form: T) => {
        for (const rule of fieldRules) {
            if (rule === 'required' && (value === undefined || value === null || value === "")) {
                addError(field, 'Required field.');
                break;
            }

            if (typeof rule === 'object') {
                if ('min' in rule && rule.min !== undefined && value?.length < rule.min) {
                    addError(field, `Minimum ${rule.min} characters.`);
                    break;
                }
                if ('max' in rule && rule.max !== undefined && value?.length > rule.max) {
                    addError(field, `Maximum ${rule.max} characters.`);
                    break;
                }
                if ('type' in rule && rule.type === 'number' && isNaN(Number(value))) {
                    addError(field, 'Must be a number.');
                    break;
                }
                if ('type' in rule && rule.type === "email" && !validateEmail(value)) {
                    addError(field, "Invalid email.");
                    break;
                }
                if ('custom' in rule && rule.custom && typeof rule.custom === "function") {
                    const result = rule.custom(value, form);
                    if (result !== true) {
                        addError(field, typeof result === "string" ? result : 'Invalid value.');
                        break;
                    }
                }
            }
        }
    };

    const validateEmail = (email: string): boolean => {
        if (!email) return false;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const addError = (field: keyof T, message: string) => {
        (errors as Partial<Record<keyof T, string>>)[field] = message;
    };

    const clearErrors = () => {
        Object.keys(toRaw(errors)).forEach((key) => delete (toRaw(errors) as Partial<Record<keyof T, string>>)[key as keyof T]);
        hasErrors.value = false;
    };

    const setErrors = (serverErrors: Record<string, string[] | string>) => {
        clearErrors();
        for (const field in serverErrors) {
            (toRaw(errors) as Partial<Record<keyof T, string>>)[field as keyof T] = Array.isArray(serverErrors[field])
                ? serverErrors[field][0]
                : serverErrors[field];
        }
        hasErrors.value = true;
    };

    return {
        errors,
        hasErrors,
        validate,
        clearErrors,
        setErrors,
    };
}