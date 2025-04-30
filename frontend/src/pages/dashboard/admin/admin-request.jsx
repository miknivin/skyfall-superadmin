import { useGetAllAdminRequestsQuery } from "@/redux/api/adminApi";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
  
  export function AdminRequestComponent() {
    const { data: adminRequests, isLoading, error } = useGetAllAdminRequestsQuery();
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error fetching admin requests: {error.message}</div>;
    }
  
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Admin Requests
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <style>
              {`
                .resort-chip {
                  max-width: 100px; /* Adjust based on design */
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .resort-chip-container {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 4px;
                }
              `}
            </style>
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["User", "resorts", "status", "created", ""].map((el) => (
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
                {adminRequests?.data?.map(
                  ({ _id, name, email, requestDetails, status, createdAt }, key) => {
                    const className = `py-3 px-5 ${
                      key === adminRequests.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    const statusColor =
                      status === "approved"
                        ? "green"
                        : status === "pending"
                        ? "blue"
                        : "red";
                    const statusValue = status.charAt(0).toUpperCase() + status.slice(1);
  
                    const formattedDate = new Date(createdAt).toLocaleDateString();
  
                    // Get resorts, limit to 3
                    const resorts = requestDetails?.resorts || [];
                    const displayedResorts = resorts.slice(0, 3);
  
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
                          <div className="resort-chip-container">
                            {displayedResorts.map((resort, index) => (
                              <span
                              id="badge-dismiss-dark"
                              className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-sm dark:bg-gray-700 dark:text-gray-300 text-ellipsis"
                            >
                                {resort.name.length > 8 ? resort.name.slice(0, 11) + "..." : resort.name}
                            </span>
                            
                            ))}
                            {resorts.length > 3 && (
                              <Chip
                                variant="ghost"
                                value="..."
                                className="text-xs"
                              />
                            )}
                          </div>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={statusColor}
                            value={statusValue}
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
                            to={_id}
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default AdminRequestComponent;