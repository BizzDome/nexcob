import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import useValidation from '@/composables/useValidation';

type ModalType = 'create' | 'edit' | 'delete';

interface ModelHandler<T> {
  base: () => T;
  hydrate: (data: Partial<T>) => T;
}

export default function useModal<T extends Record<string, any>>(model: ModelHandler<T>) {
  const modalType = ref<ModalType | null>(null);
  const setData = ref<Partial<T> | null>(null);
  const form = ref<T>(model.base());
  const isModalOpen = ref(false);
  const isSubmitting = ref(false);
  const isDeleting = ref(false);

  const { errors, validate, clearErrors, setErrors } = useValidation<T>();

  const openModal = (type: ModalType, data: Partial<T> | null = null) => {
    isModalOpen.value = true;
    modalType.value = type;

    if ((type === 'edit' || type === 'delete') && data) {
      setData.value = data;
      if (type === 'edit') {
        form.value = model.hydrate(data);
      }
    } else {
      setData.value = null;
      form.value = model.base();
    }
  };

  const closeModal = () => {
    isModalOpen.value = false;
    setTimeout(() => {
      modalType.value = null;
      setData.value = null;
      form.value = model.base();
      clearErrors();
    }, 300);
  };

  const submitForm = (
    route: string,
    rules: Partial<Record<keyof T, any[]>> | null = null
  ) => {
    if (rules && validate(form.value, rules)) {
      return;
    }

    isSubmitting.value = true;

    const onFinish = () => {
      isSubmitting.value = false;
    };

    if (modalType.value === 'edit' && setData.value?.id) {
      router.put(`${route}/${setData.value.id}`, form.value, {
        onSuccess: closeModal,
        onError: setErrors,
        onFinish,
      });
    } else if (modalType.value === 'create') {
      router.post(route, form.value, {
        onSuccess: closeModal,
        onError: setErrors,
        onFinish,
      });
    }
  };

  const deleteForm = (route: string) => {
    isDeleting.value = true;
    router.delete(`${route}/${setData.value?.id}`, {
      onSuccess: closeModal,
      onError: setErrors,
      onFinish: () => {
        isDeleting.value = false;
      },
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
