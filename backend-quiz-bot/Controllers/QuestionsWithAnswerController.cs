using BackendQuizBot.Data;
using BackendQuizBot.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BackendQuizBot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsWithAnswerController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public QuestionsWithAnswerController(ApplicationContext context)
        {
            _context = context;
        }
        // GET: api/Questions
        [HttpGet("{questionId}")]
        public ActionResult<QuestionWithAnswerVM> GetQuestionsWithAnswer(int questionId)
        {
            try
            {
                var question = _context.Questions.Find(questionId);
                var result = new QuestionWithAnswerVM
                {
                    QuestionDescription = question.Description,
                    QuestionId = question.Id
                };
                var answers = _context.Answers.Where(i => i.QuestionId == questionId).ToList();
                result.Answers = answers;

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // GET: api/Questions
        [HttpPost]
        public ActionResult CheckQuestionsWithAnswer(List<CheckAnswerVM> datas)
        {
            try
            {
                int count = 0;
                List<string> rightAnswerList = new List<string>();
                foreach (var data in datas)
                {
                    var question = _context.Questions.FirstOrDefault(i => i.Id == data.questionId);
                    var answer = _context.Answers.FirstOrDefault(i => i.Id == data.answerId);
                    var rightAnswer = _context.Answers.FirstOrDefault(i=>i.QuestionId == question.Id && i.IsTrue);
                    if (answer.QuestionId != question.Id)
                    {
                        return BadRequest();
                    }

                    if (answer.IsTrue)
                    {
                        count++;
                    }
                    else
                    {
                        rightAnswerList.Add($"{question.Id}:{rightAnswer.Id}");
                    }
                }
                double procent = ((double)count / datas.Count) * 100;
                return Ok(new
                {
                    CountRight = count,
                    ErrorAnswers = string.Join(",", rightAnswerList.ToArray()),
                    Result = $"{procent} %"
                }) ;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
