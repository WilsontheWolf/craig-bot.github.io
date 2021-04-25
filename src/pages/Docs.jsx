import React, { useEffect, useState } from 'react';
import loader from '/images/loader.svg';
import MDXPage from './MDXPage'
import { Banner } from '../components/Banner';
const Docs = {
    Page: ({ url }) => {
        const [pageData, updatePageData] = useState(null);
        const [currentPage, changePage] = useState(null);
        useEffect(() => {
            (async () => {
                try {
                    const data = (await fetch(`${import.meta.env.SNOWPACK_PUBLIC_URL}/docs/info.json`))
                    if (!data.ok) updatePageData('Error fetching docs data! Please reload and try again.');
                    updatePageData(await data.json());
                } catch (e) {
                    updatePageData('Error fetching docs data! Please reload and try again.');
                }
            })();
        }, [])
        useEffect(() => {
            const [, p] = url.match(/^docs(?:\/(\w+))?$/);
            if (!p) {
                if (!pageData?.main) return;
                window.location.href = `#/docs/${pageData.main}`;
            } else
                changePage(p)
        }, [pageData, url]) 
        return (
            <div>
                <div className="fixed top-0 h-screen box-border pt-12 pb-2 w-52 md:ml-5 ml-2" >
                    <div className="bg-gray-900 h-full box-border rounded-lg p-1 px-2 overflow-y-auto">
                        {pageData ?
                            typeof pageData === 'string' ? pageData :
                                pageData.cats.map((cat) =>
                                    [
                                        <h1 className="w-full text-xl text-left px-1">{cat.name}</h1>,
                                        pageData.pages.filter(p => p.cat === cat.id)
                                        .map(page => 
                                            <button 
                                            className={`w-full rounded text-left ${currentPage === page.id ? 'bg-blue-500' : 'hover:bg-gray-500'} px-1`}
                                            onClick={() => window.location.href = `#/docs/${page.id}`}
                                            >{page.name}</button>
                                            )
                                    ]
                                )
                            : <img className="m-auto" src={loader} />}
                    </div>
                </div>
                <Banner type="warn" className="ml-60 md:mr-10 mr-5">The docs are incomplete and data might be missing.</Banner>
                <MDXPage.Page url={!currentPage ? null : pageData?.pages.find(p => p.id === currentPage)?.url || 'missingPage'} path="/docs/" className="ml-60 md:mr-10 mr-5" />
            </div>
        );
    },
    match: /^docs(?:\/.*)?$/
}

export default Docs;
