import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// User state interface according to the provided model
export interface UserState {
    id: string;                 // @id @default(cuid())
    email: string;              // @unique
    name?: string | null;
    avatar?: string | null;
    igUserId?: string | null; // @unique
    firebaseUuid: string;       // @unique
    createdAt: string;          // ISO string (DateTime)
    updatedAt: string;          // ISO string (DateTime) @updatedAt
    accessToken?: string | null;
    igData?: igDataState
}

interface igDataState {
    avatar?: string
    userName?: string
}

const initialState: UserState = {
    id: "",
    email: "",
    name: null,
    avatar: null,
    igUserId: null,
    firebaseUuid: "",
    createdAt: "",
    updatedAt: "",
    accessToken: null,
    igData: {}
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return { ...state, ...action.payload };
        },
        clearUser: (state) => {
            return initialState
        }
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
