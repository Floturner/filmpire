import { Box, Pagination as MuiPagination } from '@mui/material';

function Pagination({ currentPage = 1, totalPages = 0, setPage }) {
  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <MuiPagination
        shape="rounded"
        variant="outlined"
        color="primary"
        count={totalPages > 500 ? 500 : totalPages}
        page={currentPage}
        onChange={(_, value) => setPage(value)}
      />
    </Box>
  );
}

export default Pagination;
