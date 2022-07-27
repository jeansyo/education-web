import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import HomeButtonCreateCourse from '../components/home/HomeButtonCreateCourse'
import HomeButtonRemoveCourse from '../components/home/HomeButtonRemoveCourse';
import { fetchWithToken } from '../utils/fetchWithToken';

export default function HomeScreen() {

    const [courses, setCourses] = useState([]);

    const getMyCourses = async () => {
        try {
            
            const res = await fetchWithToken('api/courses')
            const {
                api,
                result
            } = await res.json()

            if(api.codeError === "200") {
                setCourses(result)
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMyCourses();
    }, [])
    

  return (
    <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">
                Mis cursos
            </h1>
            <HomeButtonCreateCourse
                setCourses={setCourses}
            />
        </div>
        <div className="row">
            {
                !!courses.length
                && courses.map(({id, name, students}) => (
                    
                        <div
                            className="col-xl-3 col-md-6 mb-4" 
                            key={id}   
                        >
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <Link 
                                                to={`/${id}`}
                                            >
                                                <div className="text-xs text-color font-weight-bold text-uppercase mb-1">
                                                    {
                                                        name
                                                    }
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    {
                                                        `${students || 0} alumnos`
                                                    }
                                                </div>
                                            </Link>
                                        </div>
                                        <HomeButtonRemoveCourse
                                            id={id}
                                            setCourses={setCourses}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                ))
            }
        </div>
    </div>
  )
}
