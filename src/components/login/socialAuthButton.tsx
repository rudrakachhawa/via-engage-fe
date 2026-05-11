"use client";

import {
    signInWithPopup,
} from "firebase/auth";

import {
    auth,
    googleProvider,
} from "@/lib/firebase";
import { userLoginApi } from "@/api/user";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

export default function SocialAuthButtons() {
    const dispatch = useAppDispatch()
    const handleLogin = async () => {

        try {

            const result =
                await signInWithPopup(
                    auth,
                    googleProvider
                );

            const token =
                await result.user.getIdToken();

            const response = await userLoginApi(token)
            dispatch(setUser(response.user))

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <button onClick={handleLogin}>
            Continue with Google
        </button>
    );
}