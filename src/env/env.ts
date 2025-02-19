import * as dotenv from 'dotenv'

export const getEnv = () => {
    if (process.env.ENV) {
        dotenv.config({
            override: true,
            path: `src/helper/env/.env.prod`
        })
    } else {
        console.error("NO ENV PASSED!")
    }

}