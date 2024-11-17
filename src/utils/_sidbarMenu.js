import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

export const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    title: "Manage Users",
    icon: <ManageAccountsIcon />,
    subItems: [
      { title: "Add User", path: "/add-user", icon: <PersonAddAltIcon /> },
      { title: "Users List", path: "/users-list", icon: <PeopleOutlineIcon /> },
    ],
  },
  {
    title: "Manage Categories",
    icon: <CategoryIcon />,
    subItems: [
      {
        title: "Add Category",
        path: "/add-categories",
        icon: <AddCircleOutlineIcon />,
      },
      { title: "Categories List", path: "/categories", icon: <ListAltIcon /> },
    ],
  },
  {
    title: "Manage Brands",
    icon: <CategoryIcon />,
    subItems: [
      {
        title: "Add Brand",
        path: "/add-brand",
        icon: <AddCircleOutlineIcon />,
      },
      { title: "Brand List", path: "/brands", icon: <ListAltIcon /> },
    ],
  },
  {
    title: "Manage Products",
    icon: <CategoryIcon />,
    subItems: [
      {
        title: "Add Product",
        path: "/product",
        icon: <AddCircleOutlineIcon />,
      },
      { title: "Product List", path: "/products", icon: <ListAltIcon /> },
    ],
  },
];
