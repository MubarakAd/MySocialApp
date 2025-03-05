import { getUser } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AuthenticatedUser = async () => {
  const userId = await currentUser();
  if (!userId) {
    return null;
  }
  const user = await getUser(userId.id);
  if (!user) return <div>hekkkkk</div>;
  return (
    <div className="sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthenticatedUser;
