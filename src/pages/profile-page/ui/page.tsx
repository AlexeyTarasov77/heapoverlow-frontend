import { useNavigate } from "react-router-dom";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useAppSelector } from "../../../app/hooks";
import { Avatar, Divider, Grid2, Typography } from "@mui/material";
import { QuestionItem } from "./QuestionItem";
import { Loader } from "../../../shared/ui";
import { useEffect } from "react";
import { User } from "../../../entities/users";

export function ProfilePage() {
  let { user, isLoading } = useAppSelector((state) => state.users);
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) navigate("/users/signin")
  }, [user])
  if (isLoading) {
    return <Loader />
  }
  user = user as User
  const avatarSize = { width: 150, height: 150, fontSize: 40 }
  return (
    <div className="flex flex-col mt-7">
      <div className="flex gap-5 items-center">
        {user.imageUrl ? (
          <Avatar src={user.imageUrl} sx={avatarSize} />
        ) : (
          <Avatar sx={avatarSize}>{user.username[0].toUpperCase()}</Avatar>
        )}
        <div>
          <div className="font-bold">{user.username}</div>
          <div>
            Member since: <EditCalendarIcon /> {new Date(user.createdAt).toDateString()}
          </div>
          {user.location &&
            <div>
              From: <LocationCityIcon /> {user.location}
            </div>
          }
          <div>Reputation: {user.reputation}</div>
        </div>
      </div>
      <Divider flexItem sx={{ marginY: 2 }} />
      <div>
        <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>Questions:</Typography>
        <Grid2 container spacing={2}>
          {user.questions.map(question => <QuestionItem key={question.id} question={question} />)}
        </Grid2>
      </div>
    </div>
  );
}
