type MajorType = {
  major_id?: string;
  name?: string;
  parent_id?: string;
};
type UniversityType {
  logo?: string;
  name?: string;
  university_id?: string;
}
interface UserInfoType {
  annual_list_type?: number;
  avatar_large?: string;
  company?: string;
  description?: string;
  digg_article_count?: number;
  digg_shortmsg_count?: number;
  favorable_author?: number;
  followee_count?: number;
  follower_count?: number;
  got_digg_count?: number;
  got_view_count?: number;
  identity?: number;
  is_select_annual?: boolean;
  isfollowed?: boolean;
  job_title?: string;
  level?: number;
  user_name?: string;
  user_id?: string;
  study_point?: number;
  student_status?: number;
  select_online_course_count?: number;
  select_event_count?: number;
  select_annual_rank?: number;
  power?: number;
  post_shortmsg_count?: number;
  post_article_count?: number;
  major?: MajorType;
  university?: UniversityType;
}
export default UserInfoType;