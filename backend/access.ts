import { ListAccessArgs } from "./types";
import { permissionsList } from "./schemas/fields";

// At it's simplest,the access control returns a yes or no value depending on the users session
export const isSignedIn = ({ session }: ListAccessArgs) => {
  return !!session;
};

const generatePermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    ({ session }: ListAccessArgs) => {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissons check if someone meets a criteria - YES or NO
export const Permission = {
    ...generatePermissions,
    isAwesome({session}: ListAccessArgs): boolean {
        return session?.data.name?.includes('HARDIK')
    }
};

// Rule based Function