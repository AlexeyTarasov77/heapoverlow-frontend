import LocationCityIcon from "@mui/icons-material/LocationCity";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
"use client"
import { useAppSelector } from "../../../app/store";
import { Divider, Grid2, Typography } from "@mui/material";
import { QuestionItem } from "./QuestionItem";
import { Loader } from "../../../shared/ui";
import { UserAvatar } from "../../../shared/ui/user-avatar/UserAvatar";

export function ProfilePage() {
  let { user, isLoading } = useAppSelector((state) => state.users);
  if (isLoading) {
    return <Loader />;
  }
  user = user!
  const avatarSize = { width: 150, height: 150, fontSize: 40 };
  return (
    <div className="flex flex-col mt-7">
      <div className="flex gap-5 items-center">
        <UserAvatar
          sx={avatarSize}
          username={user.username}
          imageUrl={user.imageUrl}
        />
        <div>
          <div className="font-bold">{user.username}</div>
          <div>
            Member since: <EditCalendarIcon />{" "}
            {new Date(user.createdAt).toDateString()}
          </div>
          {user.location && (
            <div>
              From: <LocationCityIcon /> {user.location}
            </div>
          )}
          <div>Reputation: {user.reputation}</div>
        </div>
      </div>
      <Divider flexItem sx={{ marginY: 2 }} />
      <div>
        <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
          Questions:
        </Typography>
        <Grid2 container spacing={2} sx={{ alignItems: "stretch" }}>
          {user.questions.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))}
        </Grid2>
      </div>
    </div>
  );
}
