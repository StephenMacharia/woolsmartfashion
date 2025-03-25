import React from 'react'

const Aboutus = () => {
  return (
    <div className="row justify-content-center">
        <h1 className="display-4">
            About Us
        </h1>
        <div className="col-md-6">
            <div className="card shadow p-4 m-3">
                <img src="images/team.jpg" alt="" />
            </div>
        </div>
        <div className="col-md-6">
            <h2>Members</h2>
            <ul>
                <li>Joyce:CEO</li>
                <li>Benard:COO</li>
                <li>Joseph:member</li>
                <li>Mary:Member</li>
            </ul>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ratione similique delectus non. Cupiditate, quos debitis. Deleniti sequi perferendis dolorem aliquam ipsum repellat tempora! Dolore, earum pariatur nemo aut perferendis cum quo ipsam velit similique possimus repellat obcaecati. Ea saepe, explicabo adipisci quibusdam beatae nobis!</p>
            <h3 className='text-primary'>over 30+services offered</h3>
        </div>
    </div>
  )
}

export default Aboutus
