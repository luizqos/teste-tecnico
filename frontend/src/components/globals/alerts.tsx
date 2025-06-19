import Swal from 'sweetalert2';

interface SweetAlertProps {
  title: string;
  text?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const SweetAlertConfirm = async ({
  title,
  text = '',
  onConfirm,
  onCancel,
}: SweetAlertProps) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed) {
    onConfirm();
  } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
    onCancel();
  }
};

export default SweetAlertConfirm;

