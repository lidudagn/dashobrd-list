import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidenav";
import Table from "../components/TableList";
import ProductList from "../components/CardList";
import axios from "axios";
import { FaThLarge, FaList, FaInfoCircle } from "react-icons/fa";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Products");
  const [view, setView] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  // const [page, setPage] = useState(1);
  const [page, setPage]=useState ({pageIndex:0,pageSize:8})
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(true); // State for mobile sidebar visibility
  const [isShrunk, setIsShrunk] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  const itemsPerPage = 8;

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Check size on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if ( window.innerWidth <= 768) {
      setIsOpen(false);
    }
    // Set isOpen to false when the component mounts
  }, [activeTab]);

  // Fetch data from API
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setIsLoading(true)
  //     try {
  //       const response = await axios.get(
  //         `https://api.escuelajs.co/api/v1/products?offset=${(page.pageIndex)}&limit=${itemsPerPage}`
  //       );

  //       const unsplashImages = {
  //         hudi: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D',
  //         busoGris: 'https://images.unsplash.com/photo-1641642231157-0849081598a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxzd2VhdGVyfGVufDB8fDB8fHww'
  //       };

  //       const data = response.data;
  //       const updatedProducts = data.map(product => {
  //         if (product.images.length < 2) {
  //           if (product.title.toLowerCase().includes("hudi")) {
  //             product.images = [unsplashImages.hudi];
  //           } else if (product.title.toLowerCase().includes("buso gris")) {
  //             product.images = [unsplashImages.busoGris];
  //           }
  //         }
  //         return product;
  //       });
  //       setIsLoading(false)
  //       setProducts(updatedProducts);
  //       setTotalPages(8); // Adjust based on the API response if available
  //     } catch (error) {
  //       setIsLoading(false)
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, [page.pageIndex]);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products?offset=${page.pageIndex * page.pageSize}&limit=${page.pageSize}`
        );
  
        const unsplashImages = {
          hudi: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D',
          busoGris: 'https://images.unsplash.com/photo-1641642231157-0849081598a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxzd2VhdGVyfGVufDB8fDB8fHww'
        };
  
        const data = response.data;
        const updatedProducts = data.map(product => {
          if (product.images.length < 2) {
            if (product.title.toLowerCase().includes("hudi")) {
              product.images = [unsplashImages.hudi];
            } else   {
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
  }, [page]);  // Updated dependency array
  

  // Handle search filtering
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewToggle = () => {
    setView((prevView) => (prevView === "table" ? "card" : "table"));
  };

  return (
    <div className=
    {`${isOpen ? "H flex  w-full justify-evenly  " : "w-full flex-col"}`}
    >
      <div
    
       className={`${isShrunk ? " min-w-[80px]" : " w-2/12 "}`}
      >
      <Sidebar isOpen={isOpen} isShrunk={isShrunk} setIsShrunk={setIsShrunk} setIsOpen={setIsOpen} setActiveTab={setActiveTab} activeTab={activeTab} className="" />

      </div>
      <div className="flex flex-col w-full">
        <div className="flex mt-0 sm:mt-10 sm:mr-20 mr-0 justify-center sm:justify-end">
          <div className="flex flex-col md:flex-row md:justify-between items-center ">
            <div className="relative flex items-center space-x-2 w-full md:w-auto  w-full">
              <FaThLarge
                className={`cursor-pointer text-xl ${
                  view === "table" ? "text-custom-purple" : "text-[#FFA500]"
                }`}
                onClick={() => setView("card")}
              />
              <FaList
                className={`cursor-pointer text-xl ${
                  view === "card" ? "text-custom-purple" : "text-[#FFA500]"
                }`}
                onClick={() => setView("table")}
              />
              <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative flex items-center">
                  <input
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    className="rounded-md bg-[#FFA500] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg ml-2"
                    type="button"
                    
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on activeTab */}
        {activeTab === "Products" ? (
          // Render either the table or card view
          view === "table" ? (
            <Table products={filteredProducts} page={page} isLoading={isLoading} setPage={setPage} totalPages={totalPages}  className={`${isShrunk ? "w-full " : "w-10/12"}`} />
          ) : (
            <ProductList products={filteredProducts} page={page} setPage={setPage} totalPages={totalPages}   className={`${isOpen ? "w-full" : "w-10/12"}`}/>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex justify-center content-center mx-auto ">
    <FaInfoCircle className=" text-2xl sm:text-5xl text-purple-900" />
    <p className="ml-4 text-md sm:text-xl text-gray-600">Content for {activeTab} is currently not available.</p>
      </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;