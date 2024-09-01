export interface IUser {
    id:                 number;
    name:               string;
    father_name:        string;
    grandfather_name:   null;
    family_branch_name: null;
    tribe:              null;
    image:              null;
    gender:             string;
    date_of_birth:      null;
    country_id:         null;
    phone:              string;
    phone_code:         null;
    country_code:       string;
    email:              string;
    type:               string;
    active:             number;
    is_premium:         number;
    code:               string;
    verified_at:        Date;
    created_at:         null;
    updated_at:         Date;
    role:               null;
    permissions:        null;
    token:              string;
}