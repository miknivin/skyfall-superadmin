export interface Location {
  latitude: number;
  longitude: number;
  displayName: string;
  formattedAddress: string;
}

export interface Document {
  type:string
  name: string;
  url: string;
}

export interface Resort {
  name: string;
  location: Location;
  description?: string;
  documents?: Document[];
}

export interface AdminRequest {
  _id?:string
  userId?: string;
  name: string;
  email: string;
  phone: string;
  status?: "pending" | "approved" | "rejected";
  requestDetails?: {
    resorts: Resort[];
  };
  reviewedBy?: string;
}
