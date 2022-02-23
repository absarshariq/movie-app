
const useGenre=(selctedGenres)=>{
if(selctedGenres.length<1)
{
    return "";
}
const genereIds=selctedGenres.map(i=>i.id);
return genereIds.reduce((acc,cur)=>acc+','+cur);
}
export default useGenre;