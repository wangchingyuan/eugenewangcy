import Link from "next/link";

export default function Projects() {
    return (
    <div className="grid grid-rows-[auto_auto] p-10 gap-10">

        <div className="border-spacing-1 border-green-600">
            <Link href="https://www.eugenewangcy.com">
                eugenewangcy.com
            </Link>
            <p>&quot;More than just a personal site.&quot;</p>
            <a href="https://docs.google.com/document/d/17ARQfITjiHuhjzRYNAV12xecAJb2ZfKuOMymTYhaD8Q/edit">
                &#128279; See Design Doc</a>
            <p>Went live Oct 2022. Further improvements coming.&#128295;</p>
        </div>

        <div className="border-spacing-1 border-green-600">
            <Link href="https://www.relivemytrades.com">
                relivemytrades.com
            </Link>
            <p>&quot;So you don&apos;t believe in efficient market hypothesis?&quot;</p>
            <a href="https://docs.google.com/document/d/1QGz1JDxxNWvPa-z1w-F24XJanx3jWtuWoXAgHFuDaAs/edit">
                &#128279; See Design Doc</a>
            <p>TO BE STARTED</p>
            
        </div>
        <div className="border-spacing-1">
            <Link href="https://www.youneedarock.com">
                youneedarock.com
            </Link>
            <p>&quot;Nice looking e-commerce site where you can buy a rock.&quot;</p>
            <a href="https://docs.google.com/document/d/19OJOOXG1ScEMN1eKNUyQ1Ut8ySJsyz3f0SeGdBLZkHI/edit">
                &#128279; See Design Doc</a>
            <h1>TO BE STARTED</h1>
            {/* <h1>
                hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! hello projects! 
            </h1> */}
        </div>
    </div>

    )
}
