import Link from "next/link";
import Login from "./components/Login";

import { Button } from "@mui/material";

const login = () => {
    return (
        <div>
            <Link href='/articles'>
                <Button>記事一覧</Button>
            </Link>
            <Login />
            
        </div>
    );
}

export default login;