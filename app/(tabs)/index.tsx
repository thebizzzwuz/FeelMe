import { Redirect } from "expo-router";
import React from "react";

/**
 * TEMPORARY FIX: This file is currently overriding the authentication page
 * to allow direct access to content pages for development and testing.
 */
export default function Index() {
  
  // 🎯 CHANGE THIS PATH to view a different page:
  // Use '/progress', '/pre_rating', or '/post_results'
  return <Redirect href="/pre-intervention"/>; 
}