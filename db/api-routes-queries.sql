SELECT * FROM userProfiles

select * from userProfiles
select * from bucketlists
select * from activities
select * from categories

SELECT userprofiles.uid, userprofiles.name, bucketlists.activityId, activities.activity, activities.categoryId, categories.category
FROM userprofiles
INNER JOIN bucketlists ON userprofiles.id = bucketlists.userId
INNER JOIN activities ON bucketlists.activityId = activities.id
INNER JOIN categories ON activities.categoryId = categories.id
WHERE userprofiles.uid = "sUT5cnwz3He8kEo3NHksK6osX0J2"

SELECT s.name as Student, c.name as Course 
FROM student s
    INNER JOIN bridge b ON s.id = b.sid
    INNER JOIN course c ON b.cid  = c.id 
ORDER BY s.name 