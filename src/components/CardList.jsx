

import React, { Suspense, useState } from 'react';
import { Card, CardMedia, Button, Typography, Box, Grid, Pagination, Skeleton } from '@mui/material';




const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = useState(false);

  const maxDescriptionLength = 100;
  const truncatedDescription = product.description.length > maxDescriptionLength
    ? `${product.description.substring(0, maxDescriptionLength)}...`
    : product.description;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 3,
          overflow: 'hidden',
          position: 'relative',
          padding: 2,
        }}
      >
        <Box sx={{ position: 'relative', height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMedia
            component="img"
            sx={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
              borderRadius: 2,
            }}
            image={product.images[0]}
            alt={product.title}
          />
        </Box>
        <Box sx={{ paddingTop:2 }}>
        <Typography
  variant="div"
  sx={{
    fontWeight: 'semibold',
    fontSize: product.title.length > 35 ? '0.875rem' : '1rem', 
  }}
  marginBottom={2}
>
  {product.title}
</Typography>



          <Typography variant="body2" sx={{ color: 'text.secondary' }} marginTop={2}>
            {expanded ? product.description : truncatedDescription}
            {product.description.length > maxDescriptionLength && (
              <Typography
                component="span"
                onClick={handleExpandClick}
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginLeft: 0.5,
                }}
              >
                {expanded ? ' Show less' : ' See more'}
              </Typography>
            )}
          </Typography>
        
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            ${product.price}
          </Typography>
            <Button
            disableElevation
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#4B0082',
                '&:hover': {
                  backgroundColor: '#3e006c',
                },
              }}
            >
              View order
            </Button>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
const ProductList = ({ products, page, setPage, totalPages,isLoading }) => {

  const handlePageChange = (event, value) => {
   const page =value -1
    setPage((prev) => ({
      ...prev,
      pageIndex: page,  // Update only pageIndex
    }));
    
  };

  return (
    <Box sx={{ width: '100%', padding: { xs: 2, sm: 3, md: 4 }, margin: 'auto' }}>
      <Suspense fallback={<Typography variant="h6" align="center">Loading Products...</Typography>}>
        <Grid container spacing={4}>
          {products.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="text.secondary">
                There are no products available.
              </Typography>
            </Grid>
          ) :isLoading ? Array.from({ length: 8 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 3,
                  overflow: 'hidden',
                  padding: 2,
                }}
              >
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
                <Box sx={{ padding: 2 }}>
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="text" width="80%" height={20} sx={{ marginTop: 1 }} />
                  <Skeleton variant="text" width="40%" height={20} sx={{ marginTop: 2 }} />
                  <Skeleton variant="rectangular" width="50%" height={36} sx={{ marginTop: 2, borderRadius: 1 }} />
                </Box>
              </Card>
            </Grid>
          ))
          :
           (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </Grid>
      </Suspense>

      {products.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt:4 }}>
          <Pagination
            count={8}
            page={page.pageIndex + 1}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
