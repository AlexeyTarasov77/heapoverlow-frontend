import { Button, Card, CardActions, CardContent, Divider, Grid2, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../../../entities/users";

export function QuestionItem({ question }: { question: User["questions"][0] }) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={4}>
        <Card>
          <CardContent>
            <div className="flex">
              <Typography gutterBottom variant="h6">
                {question.title}
              </Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Typography sx={{ color: "text.secondary" }}>{new Date(question.createdAt).toDateString()}</Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link to={`/questions/${question.id}`}>Learn more</Link>
            </Button>
          </CardActions>
        </Card>
      </Grid2>
    </Grid2>
  )
}
