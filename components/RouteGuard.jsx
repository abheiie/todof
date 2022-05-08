import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function RouteGuard({ children }) {

    const authUser = useSelector((state) => state.auth.user);
    // const authUser = false
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser]);
    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/auth/login', '/auth/register'];
        const path = url.split('?')[0];


        if (!authUser && !publicPaths.includes(path)) {
            setAuthorized(false);
            console.log("--------------CASE 1--------------")
            router.push({
                pathname: 'auth/login',
                query: { returnUrl: router.asPath }
            });
        } else if(authUser && publicPaths.includes(path)) {
            console.log("--------------CASE 2--------------")
            setAuthorized(true);
            router.push({
                pathname: '/',
            });
        }else{
            console.log("--------------CASE 3--------------")
            setAuthorized(true);
        }
    }

    return (authorized && children);
}

export { RouteGuard };
