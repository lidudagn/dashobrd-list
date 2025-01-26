

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
const MaterialTable = ({
  data,
  count,
  columns,
  page,
  setPage,
  loading = true,
  renderTopToolbarCustomActions,
}) => {
  const handlePaginationChange = (newPageIndex, newPageSize) => {
    setPage({
      pageIndex: newPageIndex,
      pageSize: newPageSize,
    });
  };

  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      isLoading: loading,
      pagination: {
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
      },
    },
    manualPagination: true,
    rowCount: count,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(page) : updater;
      setPage(newPagination);
  

    },
    
    enablePagination: true,
    enableColumnPinning: true,
    getRowId: (originalRow) => originalRow.id,
  });

  return (
    <div className="p-4 flex-col overflow-y-auto flex-grow rounded-2xl w-full">
      {renderTopToolbarCustomActions && renderTopToolbarCustomActions()}
      <MaterialReactTable table={table} className="w-full" />
    </div>
  );
};

const Table = ({ products, totalPages,isLoading ,setPage,page}) => {

   const columns = [
    {
      id: "image",
      header: "Image",
      accessorKey: "images",
      Cell: ({ row }) => (
        <img
          src={row.original.images[0]} // Display the first image
          alt={row.original.title}
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      header: "Title",
      accessorKey: "title", // Access the `title` property directly
    },
    {
      header: "Price",
      accessorKey: "price", // Access the `price` property directly
      Cell: ({ cell }) => `$${cell.getValue()}`, // Format price with $
    },
    {
      header: "Description",
      accessorKey: "description",
      Cell: ({ cell }) => (
        <div style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {cell.getValue()} {/* Truncate long descriptions */}
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category.name", // Access nested `category.name`
    },
  ];
  
  return (
    <div className="p-6  w-full">
      <MaterialTable
        data={products}
        count={54} 
        columns={columns}
        page={page}
        setPage={setPage}
      
        loading={isLoading}
      />
    </div>
  );
};

export default Table;
