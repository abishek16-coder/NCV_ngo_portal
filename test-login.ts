import 'dotenv/config';
import { prisma } from './lib/prisma';

async function test() {
  const user = await prisma.user.findFirst({ where: { email: 'admin@ncvtrust.org' } });
  console.log('user:', user?.email);
  if(user) {
    try {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'LOGIN',
          entity: 'User',
          entityId: user.id
        }
      });
      console.log('audit log created');
    } catch(e) {
      console.error('Error creating audit log:', e);
    }
  }
}
test().finally(() => prisma.$disconnect());
