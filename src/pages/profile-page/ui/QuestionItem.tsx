import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../../../entities/users";

export function QuestionItem({ question }: { question: User["questions"][0] }) {
  return (
    <Grid2 size={4} minHeight={150} maxHeight={150}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <div className="flex gap-3">
            <Typography gutterBottom variant="h6">
              {question.title}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography sx={{ color: "text.secondary" }}>
              {new Date(question.createdAt).toDateString()}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to={`/questions/${question.id}`}>Learn more</Link>
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
}
