// import React, { useState, useEffect } from 'react';
// import { supabase } from '../../supabase/supabaseClient';
// import Avatar from '../Avatar';
//
// function Account({ session }) {
//     const [loading, setLoading] = useState(true)
//     const [username, setUsername] = useState(null)
//     const [website, setWebsite] = useState(null)
//     const [avatar_url, setAvatarUrl] = useState(null)
//
//     useEffect(() => {
//         getProfile()
//     }, [session])
//
//     async function getProfile() {
//         try {
//             setLoading(true)
//             const user = supabase.auth.user()
//
//             let { data, error, status } = await supabase
//                 .from('profiles')
//                 .select(`username, website, avatar_url`)
//                 .eq('id', user.id)
//                 .single()
//
//             if (error && status !== 406) {
//                 throw error
//             }
//
//             if (data) {
//                 setUsername(data.username)
//                 setWebsite(data.website)
//                 setAvatarUrl(data.avatar_url)
//             }
//         } catch (error) {
//             alert(error.message)
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     async function updateProfile({ username, website, avatar_url }) {
//         try {
//             setLoading(true)
//             const user = supabase.auth.user()
//
//             const updates = {
//                 id: user.id,
//                 username,
//                 website,
//                 avatar_url,
//                 updated_at: new Date(),
//             }
//
//             let { error } = await supabase.from('profiles').upsert(updates, {
//                 returning: 'minimal', // Don't return the value after inserting
//             })
//
//             if (error) {
//                 throw error
//             }
//         } catch (error) {
//             alert(error.message)
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     return (
//
//     )
// }
//
// export default Account;