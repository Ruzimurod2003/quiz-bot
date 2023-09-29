using BackendQuizBot.Data;
using BackendQuizBot.Models;
using BackendQuizBot.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BackendQuizBot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
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
                result.Answers = answers.Select(i =>
                        new OnlyAnswerVM
                        {
                            Id = i.Id,
                            Description = i.Description,
                            IsTrue = i.IsTrue,
                            QuestionId = i.QuestionId
                        }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // GET: api/Questions
        [HttpPost]
        public ActionResult CheckQuestionsWithAnswer(UserAlsoCheckAnswerVM datas)
        {
            try
            {
                int count = 0;
                List<string> rightAnswerList = new List<string>();
                foreach (var data in datas.AnswerAndQuestions)
                {
                    var question = _context.Questions.FirstOrDefault(i => i.Id == data.questionId);
                    var answer = _context.Answers.FirstOrDefault(i => i.Id == data.answerId);

                    if (answer.QuestionId != question.Id)
                    {
                        return BadRequest();
                    }

                    if (answer.IsTrue)
                    {
                        count++;
                    }
                }
                var userResult = new Result()
                {
                    TelegramId = datas.UserId.ToString(),
                    Created = DateTime.Now,
                    PassedExamCount = count,
                    SpentTime = datas.SpentTime
                };

                _context.Results.Add(userResult);
                _context.SaveChanges();

                return Ok(new
                {
                    All = _context.Questions.Count(),
                    Passed = count
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // GET: api/Questions
        [HttpGet]
        [Route("api/results")]
        public ActionResult<List<Result>> GetResults()
        {
            try
            {
                var results = _context.Results.ToList();
                
                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
