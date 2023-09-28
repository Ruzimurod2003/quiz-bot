using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendQuizBot.Data;
using BackendQuizBot.Models;
using BackendQuizBot.ViewModels;

namespace BackendQuizBot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public QuestionsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestionWithAnswerVM>>> GetQuestions()
        {
            try
            {
                var result = new List<QuestionWithAnswerVM>();
                var questions = await _context.Questions.ToListAsync();
                foreach (var question in questions)
                {
                    var resultOnlyModel = new QuestionWithAnswerVM
                    {
                        QuestionDescription = question.Description,
                        QuestionId = question.Id
                    };
                    var answers = _context.Answers
                        .Where(i => i.QuestionId == question.Id)
                        .ToList()
                        .Select(i =>
                        new OnlyAnswerVM
                        {
                            Id = i.Id,
                            Description = i.Description,
                            IsTrue = i.IsTrue,
                            QuestionId = i.QuestionId
                        });
                    resultOnlyModel.Answers = answers.ToList();

                    result.Add(resultOnlyModel);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, QuestionVM questionVM)
        {
            try
            {
                var question = await _context.Questions.FirstOrDefaultAsync(i => i.Id == id);

                if (question == null)
                {
                    return NotFound();
                }
                question.Description = questionVM.Description;

                await _context.SaveChangesAsync();
                return Ok(new { Result = true, Status = "Update" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(QuestionVM questionVM)
        {
            try
            {
                var question = new Question()
                {
                    Description = questionVM.Description,
                    Created = DateTime.Now
                };

                _context.Questions.Add(question);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            try
            {
                var question = await _context.Questions.FindAsync(id);
                if (question == null)
                {
                    return NotFound();
                }

                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();

                return Ok(new { Result = true, Status = "Delete" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
