import React from 'react';
import AboutUs from '../../assets/images/aboutus.jpg'
import { MemberCard } from '../../'

const About = () => {
    return (
        <>
            <div className='forgetBanner banner mb-10'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>About Us</h1>
            </div>
            <div className="px-5 md:flex md:px-20 gap-5 mt-20 w-full md:mx-20">
                <div className='md:w-[45%]'>
                    <img src={AboutUs} alt={AboutUs} className='h-screen w-full rounded' />
                </div>
                <div className='md:w-[50%]'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, in neque. Delectus minus veritatis ducimus cupiditate maiores saepe voluptas facilis molestias fugiat sint eum ipsa corrupti illum aperiam laudantium debitis, dignissimos aut nostrum exercitationem aliquid suscipit officiis eveniet nesciunt ipsam! Ad quod nam repellat repudiandae dolorum quas quae, incidunt, nulla non aspernatur explicabo? Saepe ad inventore nesciunt, quaerat accusantium asperiores accusamus dolores voluptates eaque, consequatur ut, aut fuga fugit repudiandae? Tempora iure molestias soluta nemo, quos magnam repellendus exercitationem beatae modi, numquam corporis laborum dolore officia error dolorum cumque necessitatibus corrupti ducimus blanditiis. Culpa accusantium qui at nam, blanditiis cupiditate esse eveniet minus eaque. Quisquam, soluta. Voluptates odit ab magnam est repudiandae assumenda dolor ipsum adipisci consequuntur tempore praesentium ad deserunt quibusdam voluptas aut iste similique quasi, doloremque ipsam perspiciatis doloribus eveniet! Animi, aut explicabo? Eaque animi maxime debitis odit porro repellendus neque amet, recusandae quos laborum illum beatae blanditiis nulla corrupti eos perspiciatis odio rerum hic laudantium sint cum veritatis soluta pariatur voluptate! Perspiciatis magnam nesciunt labore ipsam nulla eum doloribus. Veniam, optio minima voluptatibus impedit eligendi modi, ducimus debitis quas commodi necessitatibus repellat numquam amet earum praesentium quaerat fugit minus incidunt! Soluta iste fugit, nihil obcaecati, nobis ab ipsa, minima aspernatur cum totam sapiente sunt! Delectus laborum alias vitae quisquam nulla voluptatibus temporibus nam atque libero velit maxime id expedita fugit, nisi vero, autem in enim quis. Vitae esse necessitatibus animi obcaecati. Rerum eligendi quo, facilis nobis qui possimus. Explicabo enim laborum quisquam quis aperiam est velit reprehenderit!
                    </p>
                </div>
            </div>
            <div className='mx-5 md:px-20 md:mx-20 mt-10'>
                <h2 className='text-center text-4xl font-normal'>Our Team</h2>
                <div className="relative flex items-center sm:flex-row flex-col justify-between mt-5 gap-10">
                    <MemberCard />
                </div>
            </div>
        </>
    );
}

export default React.memo(About);
