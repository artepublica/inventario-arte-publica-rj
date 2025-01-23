import Author from './author';
import DateEvent from './date_event';
import Fact from './fact';
import Person from './person';

type Heritage = {
  ID: number;
  Image?: string;
  Authors?: Author[] | undefined;
  Title?: string;
  Material?: string;
  Height?: string;
  Width?: string;
  Depth?: string;
  Diameter?: string;
  Weight?: string;
  HeritagePrice?: string;
  OpeningDate?: string;
  ImportantDates?: DateEvent[];
  Promoter?: string;
  Financing?: string;
  Owner?: string;
  City?: string;
  State?: string;
  Country?: string;
  Area?: string;
  Neighborhood?: string;
  Address?: string;
  Latitude?: string;
  Longitude?: string;
  SpatialSupport?: string;
  Base?: string;
  BaseMaterial?: string;
  Status?: string;
  Description?: string;
  Facts?: Fact[];
  Temporality?: string;
  Function?: string;
  Nature?: string;
  Typology?: string;
  Execution?: boolean;
  Classification?: string;
  Category?: string;
  Removal?: boolean;
  Relocation?: boolean;
  RealocationAddress?: string;
  RelocationArea?: string;
  RelocationNeighborhood?: string;
  RelocationDate?: string;
  RelocationLatitude?: string;
  RelocationLongitude?: string;
  Renaming?: boolean;
  Movements?: {
    Type: string;
    Date: string;
    Area?: string;
    Neighborhood?: string;
    Address?: string;
    Latitude?: string;
    Longitude?: string;
  }[];
  Listings?: {
    Sphere: string;
    Date?: string;
  }[];
  Honorees?: Person[];
  Coating?: string;
};

export default Heritage;