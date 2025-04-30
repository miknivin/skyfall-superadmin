import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
  import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
  } from "@heroicons/react/24/solid";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
  import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useAcceptAdminRequestMutation, useGetAdminRequestByIdQuery } from "@/redux/api/adminApi";
import toast from "react-hot-toast";
import AcceptRequestDialog from "@/utils/DeleteAlert";
import { useState } from "react";

  export function AdminRequestDetails() {
    const navigate = useNavigate();
    const {id} = useParams()
    const { data, error, isLoading } = useGetAdminRequestByIdQuery(id);
    const [open, setOpen] = useState(false);
  const [acceptAdminRequest, { isLoading:acceptLoading, isError, error:acceptError, isSuccess, data:acceptResponse }] =
    useAcceptAdminRequestMutation();

  const handleOpen = () => setOpen(!open);
  const handleAccept = async () => {
    try {
      if (data.success) {
        const requestId = data?.data?._id||id;
      
      await acceptAdminRequest({ requestId }).unwrap();
      toast.success("Accepted the request")
      navigate('/dashboard/admin/request');
      }
    } catch (err) {
      // Handle error (e.g., show error toast)
      console.error('Failed to accept admin request:', err);
    }
  };

    if (isLoading) {
        return <p className="text-center">Loading..</p>
    }
    if (error) {
        return <p className="text-red-500 text-center">{error.message || "An Error occured"}</p>
    }
    return (
      <>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src="/img/bruce-mars.jpeg"
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {data?.data?.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {data.data.email}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {data.data.phone}
                  </Typography>
                </div>
              </div>
              {data?.data?.status==="pending"&&(
                <div className="w-96 flex justify-end">
                  <Button onClick={handleOpen} disabled={acceptLoading}>Accept the request</Button>
                </div>
              )}
              
            </div>
            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Resorts
              </Typography>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                {data?.data?.requestDetails?.resorts.map(
                  ({ name, location, description },index) => (
                    <Card key={index}  shadow={true} >
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-fit xl:h-40"
                      >
                        <img
                          src="https://ik.imagekit.io/c1jhxlxiy/freepik__travel.jpg?updatedAt=1738348876251"
                          alt={"Resort image"}
                          className="h-full w-full object-cover"
                        />
                      </CardHeader>
                      <CardBody className="p-3">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2"
                        >
                          {location.displayName}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {location.formattedAddress}
                        </Typography>
                      </CardBody>
                      <CardFooter className="flex flex-col gap-2 pb-3 px-1">
                        <div>
                          <Button fullWidth>
                            View Description
                          </Button>
                        </div>
                        <div>
                          <Button variant="outlined" fullWidth>
                            Documents
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  )
                )}
              </div>
            </div>
          </CardBody>
        </Card>
        <AcceptRequestDialog open={open} handler={handleOpen} onConfirm={handleAccept} />
      </>
    );
  }
  
  export default AdminRequestDetails;
  