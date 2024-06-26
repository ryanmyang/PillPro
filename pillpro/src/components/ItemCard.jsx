import { Card, CardContent, Paper, styled } from "@mui/material";

/**
 * Some styles for a single Card.
 */
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function ItemCard({ children }) {
    return (
        <Item sx={{ borderRadius: "2rem" }}>
            <Card sx={{ my: "1rem", borderRadius: "2rem" }}>
                <CardContent>{children}</CardContent>
            </Card>
        </Item>
    );
}

export default ItemCard;
