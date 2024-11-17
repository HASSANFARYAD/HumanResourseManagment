import { Card, styled } from "@mui/material";

const CustomCard = styled(Card)(({ theme }) => ({
  boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1)", // Custom shadow
  borderRadius: "8px",
  padding: theme.spacing(2),
}));

export default CustomCard;