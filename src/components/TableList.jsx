import { useState, useEffect } from "react";

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
        count={54} // Ensure this calculates total rows correctly
        columns={columns}
        page={page}
        setPage={setPage}
      
        loading={isLoading}
      />
    </div>
  );
};

export default Table;

// import React, { useState } from 'react';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

// // Dummy data generation
// const generateDummyData = (num) => {
//   return Array.from({ length: num }, (_, index) => ({
//     id: index + 1,
//     images: [`https://via.placeholder.com/50?text=Img+${index + 1}`],
//     title: `Product ${index + 1}`,
//     price: (Math.random() * 100).toFixed(2),
//     description: `Description for product ${index + 1}. This is a placeholder description.`,
//     category: { name: `Category ${Math.ceil(Math.random() * 5)}` },
//   }));
// };

// const MaterialTable = ({
//   data,
//   count,
//   columns,
//   page,
//   setPage,
//   loading = true,
//   renderTopToolbarCustomActions,
// }) => {
//   const table = useMaterialReactTable({
    // columns,
    // data,
    // state: {
    //   isLoading: loading,
    //   pagination: {
    //     pageIndex: page.pageIndex,
    //     pageSize: page.pageSize,
    //   },
    // },
    // manualPagination: true,
    // rowCount: count,
    // onPaginationChange: (updater) => {
    //   const newPagination = typeof updater === 'function' ? updater(page) : updater;
    //   setPage(newPagination);
    // },
    // enablePagination: true,
    // enableColumnPinning: true,
    // getRowId: (originalRow) => originalRow.id,
//   });

//   return (
//     <div className="p-4 flex-col overflow-y-auto flex-grow rounded-2xl w-full">
//       {renderTopToolbarCustomActions && renderTopToolbarCustomActions()}
//       <MaterialReactTable table={table} className="w-full" />
//     </div>
//   );
// };

// const Table = () => {
//   const [page, setPage] = useState({ pageIndex: 0, pageSize: 5 });
//   const products = generateDummyData(20); // Generate 20 dummy products
//   const isLoading = false; // You can set this based on your data fetching logic

//   const columns = [
//     {
//       id: 'image',
//       header: 'Image',
//       accessorKey: 'images',
//       Cell: ({ row }) => (
//         <img
//           src={row.original.images[0]}
//           alt={row.original.title}
//           style={{ width: 50, height: 50, objectFit: 'cover' }}
//         />
//       ),
//     },
//     {
//       header: 'Title',
//       accessorKey: 'title',
//     },
//     {
//       header: 'Price',
//       accessorKey: 'price',
//       Cell: ({ cell }) => `$${cell.getValue()}`,
//     },
//     {
//       header: 'Description',
//       accessorKey: 'description',
//       Cell: ({ cell }) => (
//         <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//           {cell.getValue()}
//         </div>
//       ),
//     },
//     {
//       header: 'Category',
//       accessorKey: 'category.name',
//     },
//   ];

//   // Paginate products
//   const paginatedProducts = products.slice(page.pageIndex * page.pageSize, (page.pageIndex + 1) * page.pageSize);

//   return (
//     <div className="p-6 w-full">
//       <MaterialTable
//         data={paginatedProducts}
//         count={products.length}
//         columns={columns}
//         page={page}
//         setPage={setPage}
//         loading={isLoading}
//       />
//     </div>
//   );
// };

// export default Table;
