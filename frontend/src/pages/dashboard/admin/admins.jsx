import { useGetAdminUsersQuery } from "@/redux/api/userApi";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function AdminUsersComponent() {
  const { data: adminUsers, isLoading, error } = useGetAdminUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching admins: {error.message}</div>;
  }

  // Filter users to include only those with role: "admin"
  const adminOnlyUsers = adminUsers?.users?.filter((user) => user.role === "admin") || [];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Admins
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["User", "Role", "Created", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {adminOnlyUsers.length > 0 ? (
                adminOnlyUsers.map(
                  ({ _id, name, email, role, createdAt }, key) => {
                    const className = `py-3 px-5 ${
                      key === adminOnlyUsers.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    // Role is always "admin", but keep formatting for consistency
                    const roleColor = "blue";
                    const roleValue = "Admin";

                    const formattedDate = new Date(createdAt).toLocaleDateString();

                    return (
                      <tr key={_id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={roleColor}
                            value={roleValue}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {formattedDate}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Link
                            to={`/admin/users/${_id}`}
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 px-5 text-center">
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      No admins found
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default AdminUsersComponent;