"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

interface UserRoles {
  superAdmins: number;
  projectManagers: number;
  contributors: number;
}

interface Counts {
  users: number;
  usersByRole: UserRoles;
  projects: number;
  events: number;
  sponsors: number;
}

export default function DashboardPage() {

  
 


  return (
    <div className="p-6">
      

   
    </div>
  );
}
