using BackendQuizBot.Data;
using BackendQuizBot.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    }
}
