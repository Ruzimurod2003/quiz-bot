using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendQuizBot.Data;
using BackendQuizBot.Models;
using BackendQuizBot.ViewModels;
using Microsoft.AspNetCore.Cors;

namespace BackendQuizBot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class AnswersController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public AnswersController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Answers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswers()
        {
            return await _context.Answers.Include(i => i.Question).ToListAsync();
        }

        // GET: api/Answers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Answer>> GetAnswer(int id)
        {
            var answer = await _context.Answers.FindAsync(id);

            if (answer == null)
            {
                return NotFound();
            }

            return answer;
        }

        // PUT: api/Answers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnswer(int id, AnswerVM answerVM)
        {
            try
            {
                var answer = await _context.Answers.FirstOrDefaultAsync(i => i.Id == id);

                if (answer == null)
                {
                    return NotFound();
                }
                answer.Description = answerVM.Description;
                answer.QuestionId = answerVM.QuestionId;
                answer.IsTrue = answerVM.IsTrue;

                await _context.SaveChangesAsync();
                return Ok(new { Result = true, Status = "Update" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Answers
        [HttpPost]
        public async Task<ActionResult<Answer>> PostAnswer(AnswerVM answerVM)
        {
            try
            {
                var answer = new Answer()
                {
                    Description = answerVM.Description,
                    IsTrue = answerVM.IsTrue,
                    QuestionId = answerVM.QuestionId,
                    Created = DateTime.Now
                };

                _context.Answers.Add(answer);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAnswer", new { id = answer.Id }, answer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Answers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnswer(int id)
        {
            try
            {
                var answer = await _context.Answers.FindAsync(id);
                if (answer == null)
                {
                    return NotFound();
                }

                _context.Answers.Remove(answer);
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
