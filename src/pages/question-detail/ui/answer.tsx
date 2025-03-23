import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuestionDetail } from "../../../entities/questions";
import { UserAvatar } from "../../../shared/ui/user-avatar/UserAvatar";

export function Answer({ item }: { item: QuestionDetail["answers"][0] }) {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 items-center">
          <UserAvatar
            username={item.author.username}
            imageUrl={item.author.imageUrl}
          />
          <Typography variant="caption">{item.author.username}</Typography>
        </div>
        <div>
          <Accordion>
            <AccordionSummary
              sx={{ width: "fit-content" }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography
                maxWidth="10%"
                variant="body2"
                color="textSecondary"
                noWrap={true}
              >
                {item.body}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="textSecondary">
                {item.body}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <Divider />
        <Typography color="textSecondary">
          Answered: {item.createdAt}
        </Typography>
      </div>
    </Paper>
  );
}
