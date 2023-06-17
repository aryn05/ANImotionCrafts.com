import get from 'lodash/get';

const hasPermission = (permission, permissionGroup = 'userPermissions') => {
    const permissionPresent = get(Dribbble, `JsConfig.permissions.${permissionGroup}`, []).includes(permission);

    if (!permissionPresent) {
        console.warn(`User does not have permission '${permission}'`);
    }

    return permissionPresent;
};

export default hasPermission;