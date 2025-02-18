export interface User {
  id: string;                     // UUID auto generated
  first_name: string | null;      // User's first name (nullable)
  last_name: string | null;       // User's last name (nullable)
  username: string | null;        // Login identifier (nullable)
  phone: string | null;           // Phone number (optional)
  email: string;                  // Main email address (NOT NULL, UNIQUE)
  role: UserRole;                 // Role defining permissions (NOT NULL)
  profile_photo_url: string | null;// Link to profile photo (optional)
  created_at: Date;              // Creation timestamp with timezone
  updated_at: Date | null;              // Last update timestamp with timezone
  address_id: string | null;      // UUID reference to addresses table
  aid_simulation_id: string | null; // UUID reference to aid_simulation table
}

export enum UserRole {
  CRAFTMAN = 'craftsman',
  CLIENT = 'client',
  MEDIATOR = 'mediator',
  ADMINISTRATOR = 'administrator',
}
