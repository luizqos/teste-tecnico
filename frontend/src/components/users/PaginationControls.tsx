import { PaginationButton, PaginationContainer, PaginationInfo, PaginationItensPerPage, Select } from "../styles/Users.styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
  onItemsPerPageChange,
  onPageChange,
}: PaginationProps) {
  return (
    <PaginationContainer>
      <PaginationItensPerPage>
        <label>
          Itens por página:
          <Select
            value={itemsPerPage.toString()}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Select>
        </label>
      </PaginationItensPerPage>

      <PaginationButton
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </PaginationButton>

      <PaginationInfo>
        Página {currentPage} de {totalPages}
      </PaginationInfo>

      <PaginationButton
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Próxima
      </PaginationButton>
    </PaginationContainer>
  );
}
