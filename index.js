const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('connected'))
.catch(()=>console.error('not connected',err))

const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type:Date,default:Date.now},
    ispublished:Boolean
})


const Course = mongoose.model('Course',courseSchema);
async function createcourse(){
    const course = new Course({
        name:'murtuza khadri',
        author:'mosh',
        tags:['nodejs','angular']
    })

    const result = await course.save();
console.log(result);
}

createcourse();
//eq (equal)
//ne = not equal
//gt = grater then
//gte = gretaer then  or equal
//lt = less then
//lte = less then or equal
// nin = not in

async function getcourse(){
    const pagenumber = 2;
    const pagesize = 10
    const result =  await Course.find({author:'mosh'})
    .skip((pagenumber - 1)* pagesize)
    .limit(pagesize)
    .sort({name:1})
    .select({name:1,tags:1});
    console.log(result)

}

getcourse()

// update code 
// async function updateCourse(id){
//    const course = await Course.findById(id)
// if(!course) return;
// course.ispublished = true;
// course.author = 'another author'
// const result = await course.save();
// console.log(result)
// }
// updateCourse('6448f9e79985f3bfac4e9955');

async function deleteCourse(id){
   //const course = await Course.deleteOne({_id: id});
   const result =  await Course.findByIdAndRemove(id)
   console.log(result)
}
deleteCourse('6448f744f66bd516bd268884');

