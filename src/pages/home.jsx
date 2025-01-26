

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidenav";
import Table from "../components/TableList";
import ProductList from "../components/CardList";
import axios from "axios";
import { FaThLarge, FaList, FaInfoCircle } from "react-icons/fa";
import { Box, Grid, IconButton, Paper, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, InputAdornment } from '@mui/material';
const SearchContainer = styled(Paper)({
  display: "flex",
  alignItems: "center",
  padding: "4px 8px",
  width: "100%",
  maxWidth: "300px",
  boxShadow: "none",
  border: "1px solid #ccc",
});

const Home = () => {
  const [activeTab, setActiveTab] = useState("Products");
  const [view, setView] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState({ pageIndex: 0, pageSize: 8 });
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [isShrunk, setIsShrunk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if ( window.innerWidth <= 768) {
      setIsOpen(false);
    }
  
  }, [activeTab]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products?offset=${page.pageIndex * page.pageSize}&limit=${page.pageSize}`
        );

        const unsplashImages = {
          hudi: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D",
          busoGris: "https://images.unsplash.com/photo-1641642231157-0849081598a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxzd2VhdGVyfGVufDB8fDB8fHww",
        };

        const data = response.data;
        const updatedProducts = data.map((product) => {
          if (product.images.length < 2) {
            if (product.title.toLowerCase().includes("hudi")) {
              product.images = [unsplashImages.hudi];
            } else {
              product.images = [unsplashImages.busoGris];
            }
          }
          return product;
        });

        setProducts(updatedProducts);
        setTotalPages(Math.ceil(response.data.length / page.pageSize));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewToggle = () => {
    setView((prevView) => (prevView === "table" ? "card" : "table"));
  };

  return (
    <Box display="flex" flexDirection={{ xs: "column", lg: "row" }}>
      <Box
 
        minWidth={isShrunk ? "80px" : "15% "}
        display={isOpen ? "block" : "block"}
      >
        <Sidebar
          isOpen={isOpen}
          isShrunk={isShrunk}
          setIsShrunk={setIsShrunk}
          setIsOpen={setIsOpen}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </Box>
      <Box flexGrow={1} display="flex" flexDirection="column">
      <Grid sx={{  justifyContent: isOpen? "flex-end" : "center"}}
  container
  justifyContent="flex-end"
  spacing={2}
  mt={6}
  mb={1}

>
          <Grid item>
            <IconButton onClick={() => setView("card")}  sx={{ color: view === "card" ? '#FFA500' : 'default' }}>
              <FaThLarge />
            </IconButton>
            <IconButton onClick={() => setView("table")} sx={{ color: view === "table" ? '#FFA500' : 'default' }} >
              <FaList />
            </IconButton>
          </Grid>
          <Grid item>
          <SearchContainer   sx={{ mr: isOpen ? 9 : 0 }}>
    <InputBase
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
      endAdornment={
        <InputAdornment position="end">
 <SearchIcon sx={{ color: '#FFA500' }} /> 
         </InputAdornment>
      }
    />
  </SearchContainer>
          </Grid>
        </Grid>

        {activeTab === "Products" ? (
          view === "table" ? (
            <Table
              products={filteredProducts}
              page={page}
              isLoading={isLoading}
              setPage={setPage}
              totalPages={totalPages}
            />
          ) : (
            <ProductList
              products={filteredProducts}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          )
        ) : (
          <Box display="flex" flexDirection= "column" alignItems="center" justifyContent="center" height="100vh">
            <FaInfoCircle size={48} color="#6b5b95" />
            <Typography variant="div" color="textSecondary" mt={2}>
              Content for {activeTab} is currently not available.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
