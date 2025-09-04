import React from 'react';

interface PaginationProps {
  totalCars: number;
  carsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalCars,
  carsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCars / carsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
      <button
        onClick={() => handlePrev(currentPage, onPageChange)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handleNext(currentPage, totalPages, onPageChange)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

function handlePrev(currentPage: number, onPageChange: (p: number) => void) {
  if (currentPage > 1) onPageChange(currentPage - 1);
}
function handleNext(
  currentPage: number,
  totalPages: number,
  onPageChange: (p: number) => void,
) {
  if (currentPage < totalPages) onPageChange(currentPage + 1);
}

// export default Pagination
