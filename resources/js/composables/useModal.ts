import useValidation from '@/composables/useValidation';
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { useToast } from '@/components/ui/toast/use-toast';

type ModalType = 'create' | 'edit' | 'delete';

/**
 * Interfaz para el manejador de modelos que mpermite crear
 * instancias base e hidratar datos existentes.
 */
interface ModelHandler<T> {
  base: () => T;
  hydrate: (data: Partial<T>) => T;
}

/**
 * Hook composable para manejar modales CRUD
 * @param model - Manejador del modelo que proporciona funciones base e hydrate
 * @returns Objeto con estado y métodos para controlar el modal
 */
export default function useModal<T extends Record<string, any>>(model: ModelHandler<T>) {
  // Estado del modal
  const modalType = ref<ModalType | null>(null);
  const setData = ref<Partial<T> | null>(null);
  const form = ref<T>(model.base());
  const isModalOpen = ref(false);
  const isSubmitting = ref(false);
  const isDeleting = ref(false);

  // Validación
  const { errors, validate, clearErrors, setErrors } = useValidation<T>();
  const { toast } = useToast();

  /**
   * Abre el modal y configura su estado inicial
   */
  const openModal = (type: ModalType, data: Partial<T> | null = null) => {
    isModalOpen.value = true;
    modalType.value = type;

    if ((type === 'edit' || type === 'delete') && data) {
      setData.value = data;
      form.value = type === 'edit' ? model.hydrate(data) : model.base();
    } else {
      setData.value = null;
      form.value = model.base();
    }
  };

  /**
   * Cierra el modal y limpia su estado
   */
  const closeModal = () => {
    isModalOpen.value = false;
    setTimeout(() => {
      modalType.value = null;
      setData.value = null;
      form.value = model.base();
      clearErrors();
    }, 300);
  };

  /**
   * Maneja mensajes y acciones tras operaciones exitosas
   */
  const onSuccess = () => {
    closeModal()

    const messages = {
      create: {
        title: 'Registry created',
        description: 'The registry has been created successfully',
      },
      edit: {
        title: 'Registry updated',
        description: 'The registry has been updated successfully',
      },
      delete: {
        title: 'Registry deleted',
        description: 'The registry has been deleted successfully',
      },
    }

    const currentType = modalType.value as ModalType;

    toast({
      title: messages[currentType].title,
      description: messages[currentType].description,
      variant: currentType === 'delete' ? 'destructive' : 'success',
    });
  };

  /**
   * Enviar el formulario, validando previamente si hay reglas
   */
  const submitForm = (route: string, rules: Partial<Record<keyof T, any[]>> | null = null) => {
    // Si hay reglas y no pasa la validación, deterer el envío
    if (rules && validate(form.value, rules)) return;

    isSubmitting.value = true;

    const options = {
      onSuccess,
      onError: (serverErrors: any) => setErrors(serverErrors),
      onFinish: () => { isSubmitting.value = false }
    }   

    if (modalType.value === 'edit' && setData.value?.id) {
      router.put(`${route}/${setData.value.id}`, form.value, options);
    } else if (modalType.value === 'create') {
      router.post(route, form.value, options);
    }
  };

  /**
   * Eliminar un registro existente.
   */
  const deleteForm = (route: string) => {
    isDeleting.value = true;
    router.delete(`${route}/${setData.value?.id}`, {
      onSuccess,
      onError: (serverErrors: any) => setErrors(serverErrors),
      onFinish: () => { isDeleting.value = false }
    });
  };

  return {
    modalType,
    isModalOpen,
    form,
    errors,
    isSubmitting,
    isDeleting,
    openModal,
    closeModal,
    submitForm,
    deleteForm,
    clearErrors,
  };
}
