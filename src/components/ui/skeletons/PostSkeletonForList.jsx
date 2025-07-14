import styles from "./postSkeletonForList.module.css";
const PostSkeletonForList = () => {
  return (
    <>
      <div className="p-4 space-y-4">
        <div className={`h-6 ${styles.postSkeletonForList} w-1/2`}></div>
        <div className={`h-4 ${styles.postSkeletonForList} w-full`}></div>
        <div className={`h-4 ${styles.postSkeletonForList} w-3/4`}></div>
      </div>
      <div className="p-4 space-y-4">
        <div className={`h-6 ${styles.postSkeletonForList} w-1/2`}></div>
        <div className={`h-4 ${styles.postSkeletonForList} w-full`}></div>
        <div className={`h-4 ${styles.postSkeletonForList} w-3/4`}></div>
      </div>
      <div className="p-4 space-y-4">
        <div className={`h-6 ${styles.postSkeletonForList} w-1/2`}></div>
        <div className={`h-4 ${styles.postSkeletonForList} w-full`}></div>
        <div className={`h-4 ${styles.postSkeletonForList} w-3/4`}></div>
      </div>
    </>
  );
};
export default PostSkeletonForList;
