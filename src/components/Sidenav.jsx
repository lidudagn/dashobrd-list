
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
//   Divider,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import SettingsIcon from "@mui/icons-material/Settings";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// const Sidebar = ({setActiveTab,activeTab}) => {

//   const [isShrunk, setIsShrunk] = useState(false); 

//   const menuSections = [
//     {
//       title: "MANAGEMENT",
//       items: [
//         { label: "Dashboard", icon: <DashboardIcon />, value: "Dashboard" },
//         { label: "Products", icon: <InventoryIcon />, value: "Products" },
//         { label: "Orders", icon: <ShoppingCartIcon />, value: "Orders" },
//         { label: "Customers", icon: <PeopleIcon />, value: "Customers" },
//         { label: "Reports", icon: <BarChartIcon />, value: "Reports" },
//       ],
//     },
//     {
//       title: "SUPPORT",
//       items: [
//         { label: "Settings", icon: <SettingsIcon />, value: "Settings" },
//         { label: "Help Center", icon: <HelpOutlineIcon />, value: "Help" },
//       ],
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: isShrunk ? 80 : 260, // Toggle width based on isShrunk state
//         height: "100vh",
//         bgcolor: "#f8f9fd",
//         borderRadius: "24px",
//         boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
//         bgcolor:"#E6E6FA",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         padding: isShrunk ? "24px 8px" : "24px 16px", 
//         transition: "width 0.3s, padding 0.3s", 
//       }}
//     >
//       {/* Sidebar Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" sx>
//         {/* Replace Avatar with an image */}
//         <img
//          src="https://png.pngtree.com/png-vector/20221228/ourmid/pngtree-online-shopping-logo-desing-png-image_6540923.png"
//           alt="Logo" style={{ width: isShrunk ? "0" : "200px", height: "auto" }} />
//         <IconButton
//           sx={{ bgcolor: "#e9f1ff", color: "#ff6f00" }}
//           onClick={() => setIsShrunk(!isShrunk)}
//         >
//           <ChevronRightIcon />
//         </IconButton>
//       </Box>

//       {/* Sidebar Menu */}
//       <Box>
//         {menuSections.map((section) => (
//           <Box key={section.title} mb={2}>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: "#A0AEC0",
//                 fontWeight: "bold",
//                 mb: 1,
//                 textTransform: "uppercase",
//                 display: isShrunk ? "none" : "block", // Hide section titles when sidebar is shrunk
//               }}
//             >
//               {section.title}
//             </Typography>
//             <List disablePadding>
//               {section.items.map((item) => (
//                 <ListItemButton
//                   key={item.value}
//                   selected={activeTab === item.value}
//                   onClick={() => setActiveTab(item.value)}
//                   sx={{
//                     borderRadius: "12px",
//                     marginBottom: "8px",
//                     bgcolor: activeTab === item.value ? "#FFE5D9" : "transparent",
//                     color: activeTab === item.value ? "#ff6f00" : "#4A5568",
//                     "&:hover": { bgcolor: "#FFE5D9" },
//                     paddingLeft: isShrunk ? "8px" : "16px", // Adjust padding when sidebar is shrunk
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       color: activeTab === item.value ? "#ff6f00" : "#A0AEC0",
//                       minWidth: isShrunk ? "24px" : "40px", // Shrink icon size when sidebar is shrunk
//                     }}
//                   >
//                     {item.icon}
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={item.label}
//                     sx={{ display: isShrunk ? "none" : "block" }} // Hide text when sidebar is shrunk
//                   />
//                 </ListItemButton>
//               ))}
//             </List>
//           </Box>
//         ))}
//       </Box>

//       <Divider />

//       {/* Bottom Profile Section */}
//       <Box
//         display="flex"
//         alignItems="center"
//         gap={2}
//         sx={{
//           bgcolor: "#e9f1ff",
//           borderRadius: "12px",
//           p: 2,
//           display: isShrunk ? "none" : "flex", // Hide bottom profile when sidebar is shrunk
//         }}
//       >
//         <Avatar src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfHx8MA%3D%3D" alt="Profile" />
//         <Box>
//           <Typography variant="body2" fontWeight="bold">
//             Admin Name
//           </Typography>
//           <Typography variant="caption" color="text.secondary">
//             admin@bagstore.com
//           </Typography>
//         </Box>
   
//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ setActiveTab, activeTab ,isOpen ,setIsOpen,isShrunk,setIsShrunk}) => {
 

  const menuSections = [
    {
      title: "MANAGEMENT",
      items: [
        { label: "Dashboard", icon: <DashboardIcon />, value: "Dashboard" },
        { label: "Products", icon: <InventoryIcon />, value: "Products" },
        { label: "Orders", icon: <ShoppingCartIcon />, value: "Orders" },
        { label: "Customers", icon: <PeopleIcon />, value: "Customers" },
        { label: "Reports", icon: <BarChartIcon />, value: "Reports" },
      ],
    },
    {
      title: "SUPPORT",
      items: [
        { label: "Settings", icon: <SettingsIcon />, value: "Settings" },
        { label: "Help Center", icon: <HelpOutlineIcon />, value: "Help" },
      ],
    },
  ];

  return ( isOpen ?
 (   <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom:0,
        height: '100%',
        width: isShrunk ? 80 : 260,
        zIndex: 1000,
        bgcolor: "#E6E6FA",
     
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        display: isOpen ? "flex" : { xs: "none", sm: "flex" },
        flexDirection: "column",
        justifyContent: "space-between",
        padding: isShrunk ? "24px 8px" : "24px 16px",
        transition: "width 0.3s, padding 0.3s",
      }}
      
    >
      {/* Sidebar Toggle Button for Mobile */}
      <Box sx={{ display: { xs: "flex", lg: "none",}, justifyContent: "end",}}>
      <IconButton
        sx={{ display: { xs: "block", lg: "none", }, mb: 1 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon sx={{ color: "#FFA500" }} />
      </IconButton>
        </Box>

      {/* Sidebar Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <img
          src="https://png.pngtree.com/png-vector/20221228/ourmid/pngtree-online-shopping-logo-desing-png-image_6540923.png"
          alt="Logo"
          style={{ width: isShrunk ? "0" : "200px", height: "auto" }}
        />
        <IconButton
            sx={{ display: { xs: "none", lg: "flex" }, bgcolor: "#e9f1ff", color: "#ff6f00",}}

      
          onClick={() => setIsShrunk(!isShrunk)}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Sidebar Menu */}
      <Box>
        {menuSections.map((section) => (
          <Box key={section.title} mb={2}>
            <Typography
              variant="caption"
              sx={{
                color: "#A0AEC0",
                fontWeight: "bold",
                mb: 1,
                textTransform: "uppercase",
                display: isShrunk ? "none" : "block",
              }}
            >
              {section.title}
            </Typography>
            <List disablePadding>
              {section.items.map((item) => (
                <ListItemButton
                  key={item.value}
                  selected={activeTab === item.value}
                  
                  onClick={() => setActiveTab(item.value)}
                  sx={{
                    borderRadius: "12px",
                    marginBottom: "8px",
                    bgcolor: activeTab === item.value ? "#FFE5D9" : "transparent",
                    color: activeTab === item.value ? "#ff6f00" : "#4A5568",
                    "&:hover": { bgcolor: "#FFE5D9" },
                    paddingLeft: isShrunk ? "8px" : "16px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: activeTab === item.value ? "#ff6f00" : "#A0AEC0",
                      minWidth: "40px", // Keep icon size consistent
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ display: isShrunk ? "none" : "block" }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      <Divider />

      {/* Bottom Profile Section */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          bgcolor: "#e9f1ff",
          borderRadius: "12px",
          p: 2,
          display: isShrunk ? "none" : "flex",
        }}
      >
        <Avatar src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfHx8MA%3D%3D" alt="Profile" />
        <Box>
          <Typography variant="body2" fontWeight="bold">
            Admin Name
          </Typography>
          <Typography variant="caption" color="text.secondary">
            admin@bagstore.com
          </Typography>
        </Box>
      </Box>
    </Box>):( 
      
      <IconButton
        sx={{ mb: 1 , mt:2,}}
        onClick={() =>{ setIsShrunk(false)
          setIsOpen(!isOpen)
        }}
      >
              <MenuIcon sx={{ color: "#FFA500" }} />

      </IconButton>)
  );
};

export default Sidebar;